window.LeonesFrontend = (() => {
  const API_BASE = (() => {
    const customBase = window.localStorage.getItem("LEONES_API_BASE");
    if (customBase) {
      return customBase.replace(/\/$/, "");
    }

    const { protocol, hostname, port } = window.location;
    if (port === "5500") {
      return `${protocol}//${hostname}:3000`;
    }

    return "";
  })();

  const apiUrl = (path) => {
    if (/^https?:\/\//i.test(path)) {
      return path;
    }

    return `${API_BASE}${path}`;
  };

  const formatDate = (value) => {
    if (!value) {
      return "-";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return new Intl.DateTimeFormat("es-CR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(date);
  };

  const formatDateForInput = (value) => {
    if (!value) {
      return "";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toISOString().slice(0, 10);
  };

  const isObject = (value) => value && typeof value === "object" && !Array.isArray(value);

  const idOf = (value) => {
    if (!value) {
      return "";
    }

    return isObject(value) ? value._id || "" : value;
  };

  const textOf = (value, fallback = "-") => {
    if (value == null || value === "") {
      return fallback;
    }

    if (Array.isArray(value)) {
      return value.length ? value.join(", ") : fallback;
    }

    if (typeof value === "boolean") {
      return value ? "Si" : "No";
    }

    if (isObject(value)) {
      if (value.nombre_equipo) {
        return value.nombre_equipo;
      }

      if (value.nombre_categoria) {
        return value.nombre_categoria;
      }

      if (value.nombre) {
        return value.nombre;
      }

      return JSON.stringify(value);
    }

    return String(value);
  };

  const fetchJson = async (url, options = {}) => {
    const response = await fetch(apiUrl(url), options);
    let data = null;
    let rawText = "";

    try {
      data = await response.json();
    } catch (error) {
      try {
        rawText = await response.text();
      } catch (textError) {
        rawText = "";
      }
    }

    if (!response.ok) {
      throw new Error(
        data?.mensaje ||
        rawText ||
        `La API devolvio un error (${response.status})`
      );
    }

    return data;
  };

  const setFeedback = (element, message, state = "") => {
    element.textContent = message;
    if (state) {
      element.dataset.state = state;
      return;
    }

    delete element.dataset.state;
  };

  const createField = (field) => {
    const wrapper = document.createElement("div");
    wrapper.className = field.type === "checkbox" ? "field field--checkbox" : "field";

    const label = document.createElement("label");
    label.htmlFor = field.name;
    label.textContent = field.label;

    let input;

    if (field.type === "textarea") {
      input = document.createElement("textarea");
    } else if (field.type === "select" || field.type === "multiselect") {
      input = document.createElement("select");
      input.multiple = field.type === "multiselect";
    } else {
      input = document.createElement("input");
      input.type = field.type || "text";
    }

    input.id = field.name;
    input.name = field.name;
    input.required = Boolean(field.required && field.type !== "checkbox");

    if (field.placeholder) {
      input.placeholder = field.placeholder;
    }

    if (field.type === "checkbox") {
      wrapper.appendChild(input);
      wrapper.appendChild(label);
    } else {
      wrapper.appendChild(label);
      wrapper.appendChild(input);
    }

    return wrapper;
  };

  const fillSelect = (select, options, { includeEmpty = true } = {}) => {
    const selectedValues = select.multiple
      ? Array.from(select.selectedOptions).map((option) => option.value)
      : [select.value];

    select.innerHTML = "";

    if (includeEmpty && !select.multiple) {
      const emptyOption = document.createElement("option");
      emptyOption.value = "";
      emptyOption.textContent = "Selecciona una opcion";
      select.appendChild(emptyOption);
    }

    options.forEach((option) => {
      const item = document.createElement("option");
      item.value = option.value;
      item.textContent = option.label;
      if (selectedValues.includes(option.value)) {
        item.selected = true;
      }
      select.appendChild(item);
    });
  };

  const createCrudPage = (config) => {
    const elements = {
      pageTitle: document.getElementById("pageTitle"),
      pageDescription: document.getElementById("pageDescription"),
      moduleContext: document.getElementById("moduleContext"),
      formTitle: document.getElementById("formTitle"),
      formDescription: document.getElementById("formDescription"),
      listTitle: document.getElementById("listTitle"),
      listDescription: document.getElementById("listDescription"),
      stat1: document.getElementById("stat1"),
      stat2: document.getElementById("stat2"),
      stat3: document.getElementById("stat3"),
      stat4: document.getElementById("stat4"),
      form: document.getElementById("recordForm"),
      feedback: document.getElementById("formFeedback"),
      search: document.getElementById("searchInput"),
      refresh: document.getElementById("refreshButton"),
      status: document.getElementById("statusMessage"),
      head: document.getElementById("tableHeadRow"),
      body: document.getElementById("tableBody"),
      empty: document.getElementById("emptyState"),
      cancel: document.getElementById("cancelEditButton"),
      extra: document.getElementById("extraContent")
    };

    const state = {
      records: [],
      filtered: [],
      related: {},
      editingId: ""
    };

    const renderTexts = () => {
      elements.pageTitle.textContent = config.title;
      elements.pageDescription.textContent = config.description;
      elements.moduleContext.textContent = config.context;
      elements.formTitle.textContent = state.editingId ? `Editar ${config.singular}` : `Registrar ${config.singular}`;
      elements.formDescription.textContent = config.formDescription;
      elements.listTitle.textContent = config.listTitle || `Listado de ${config.title}`;
      elements.listDescription.textContent = config.listDescription;
      document.title = `Leones FC | ${config.title}`;
    };

    const renderForm = () => {
      elements.form.innerHTML = "";
      config.fields.forEach((field) => {
        elements.form.appendChild(createField(field));
      });

      const actions = document.createElement("div");
      actions.className = "actions";

      const submit = document.createElement("button");
      submit.type = "submit";
      submit.className = "button button--primary";
      submit.textContent = state.editingId ? `Actualizar ${config.singular.toLowerCase()}` : `Guardar ${config.singular.toLowerCase()}`;

      elements.cancel.type = "button";
      elements.cancel.className = "button button--ghost";
      elements.cancel.hidden = !state.editingId;
      elements.cancel.textContent = "Cancelar edicion";

      actions.appendChild(submit);
      actions.appendChild(elements.cancel);
      elements.form.appendChild(actions);
    };

    const updateOptions = async () => {
      if (!config.related) {
        return;
      }

      const keys = Object.keys(config.related);
      await Promise.all(
        keys.map(async (key) => {
          state.related[key] = await fetchJson(config.related[key].endpoint);
        })
      );

      config.fields.forEach((field) => {
        if (!field.relatedKey) {
          return;
        }

        const select = elements.form.elements.namedItem(field.name);
        const relation = config.related[field.relatedKey];
        const items = state.related[field.relatedKey] || [];
        const options = items.map((item) => ({
          value: item._id,
          label: relation.label(item)
        }));
        fillSelect(select, options, { includeEmpty: !select.multiple });
      });
    };

    const getInputValue = (field) => {
      const input = elements.form.elements.namedItem(field.name);

      if (field.type === "checkbox") {
        return input.checked;
      }

      if (field.type === "multiselect") {
        return Array.from(input.selectedOptions).map((option) => option.value);
      }

      const rawValue = input.value.trim();
      if (!rawValue && !field.keepEmpty) {
        return undefined;
      }

      if (field.type === "number") {
        return rawValue === "" ? undefined : Number(rawValue);
      }

      return rawValue;
    };

    const buildPayload = () => {
      const payload = {};

      config.fields.forEach((field) => {
        const value = getInputValue(field);
        if (value === undefined) {
          return;
        }

        if (field.toPayload) {
          field.toPayload(payload, value, state);
          return;
        }

        payload[field.name] = value;
      });

      return payload;
    };

    const clearForm = async () => {
      state.editingId = "";
      elements.form.reset();
      renderTexts();
      renderForm();
      await updateOptions();
      setFeedback(elements.feedback, "");
    };

    const setFormValues = async (record) => {
      state.editingId = record._id;
      renderTexts();
      renderForm();
      await updateOptions();

      config.fields.forEach((field) => {
        const input = elements.form.elements.namedItem(field.name);
        if (!input) {
          return;
        }

        const value = field.fromRecord ? field.fromRecord(record) : record[field.name];
        if (field.type === "checkbox") {
          input.checked = Boolean(value);
          return;
        }

        if (field.type === "multiselect") {
          const selected = Array.isArray(value) ? value.map((item) => idOf(item)) : [];
          Array.from(input.options).forEach((option) => {
            option.selected = selected.includes(option.value);
          });
          return;
        }

        if (field.type === "date") {
          input.value = formatDateForInput(value);
          return;
        }

        input.value = value == null ? "" : isObject(value) ? idOf(value) : value;
      });

      setFeedback(elements.feedback, `Editando ${config.singular.toLowerCase()} seleccionado.`);
    };

    const renderStats = () => {
      const stats = config.stats(state);
      elements.stat1.textContent = stats[0] || "-";
      elements.stat2.textContent = stats[1] || "-";
      elements.stat3.textContent = stats[2] || "-";
      elements.stat4.textContent = stats[3] || (state.editingId ? "Edicion" : "Creacion");
    };

    const buildCell = (content) => {
      const td = document.createElement("td");
      const chip = document.createElement("span");
      chip.className = "pill";
      chip.textContent = content;
      td.appendChild(chip);
      return td;
    };

    const renderTable = () => {
      elements.head.innerHTML = "";
      elements.body.innerHTML = "";

      config.columns.forEach((column) => {
        const th = document.createElement("th");
        th.textContent = column.label;
        elements.head.appendChild(th);
      });

      const actionsHead = document.createElement("th");
      actionsHead.textContent = "Acciones";
      elements.head.appendChild(actionsHead);

      if (!state.filtered.length) {
        elements.empty.hidden = false;
        elements.status.textContent = "No hay registros para mostrar.";
        return;
      }

      elements.empty.hidden = true;
      elements.status.textContent = `${state.filtered.length} registro(s) visibles.`;

      state.filtered.forEach((record) => {
        const row = document.createElement("tr");

        config.columns.forEach((column) => {
          row.appendChild(buildCell(column.value(record, state)));
        });

        const actionsCell = document.createElement("td");
        const actions = document.createElement("div");
        actions.className = "row-actions";

        const edit = document.createElement("button");
        edit.type = "button";
        edit.className = "link-button";
        edit.textContent = "Editar";
        edit.addEventListener("click", () => {
          setFormValues(record);
        });

        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "link-button link-button--danger";
        remove.textContent = "Eliminar";
        remove.addEventListener("click", async () => {
          await fetchJson(`${config.endpoint}/${record._id}`, { method: "DELETE" });
          if (state.editingId === record._id) {
            await clearForm();
          }
          await loadRecords();
        });

        actions.appendChild(edit);
        actions.appendChild(remove);
        actionsCell.appendChild(actions);
        row.appendChild(actionsCell);
        elements.body.appendChild(row);
      });
    };

    const applyFilter = () => {
      const query = elements.search.value.trim().toLowerCase();
      state.filtered = !query
        ? [...state.records]
        : state.records.filter((record) =>
            config.searchable(record, state).some((value) =>
              String(value || "").toLowerCase().includes(query)
            )
          );

      renderTable();
      renderStats();

    };

    const loadRecords = async () => {
      elements.status.textContent = `Cargando ${config.title.toLowerCase()}...`;

      try {
        if (config.related) {
          await updateOptions();
        }

        state.records = await fetchJson(config.endpoint);
        state.filtered = [...state.records];
        renderTable();
        renderStats();

        if (typeof config.renderExtra === "function") {
          await config.renderExtra(state, elements);
        }
      } catch (error) {
        state.records = [];
        state.filtered = [];
        renderTable();
        renderStats();
        elements.status.textContent = error.message;
      }
    };

    elements.form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const isEditing = Boolean(state.editingId);
      setFeedback(elements.feedback, state.editingId ? "Actualizando registro..." : "Guardando registro...");

      try {
        const method = isEditing ? "PUT" : "POST";
        const url = isEditing ? `${config.endpoint}/${state.editingId}` : config.endpoint;
        await fetchJson(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildPayload())
        });

        await clearForm();
        setFeedback(
          elements.feedback,
          isEditing ? "Registro actualizado correctamente." : "Registro guardado correctamente.",
          "success"
        );
        await loadRecords();
      } catch (error) {
        setFeedback(elements.feedback, error.message, "error");
      }
    });

    elements.search.addEventListener("input", applyFilter);
    elements.refresh.addEventListener("click", loadRecords);
    elements.cancel.addEventListener("click", clearForm);

    renderTexts();
    renderForm();
    loadRecords();
  };

  return {
    apiUrl,
    createCrudPage,
    formatDate,
    fetchJson,
    idOf,
    textOf
  };
})();
