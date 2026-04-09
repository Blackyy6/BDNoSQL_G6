const { createCrudPage } = window.LeonesFrontend;

createCrudPage({
  title: "Categorias",
  singular: "Categoria",
  endpoint: "/api/categorias",
  description: "Configura divisiones competitivas por edad y temporada.",
  context: "Cada categoria sirve como referencia para equipos y jugadores dentro de la academia.",
  formDescription: "Completa los campos base del modelo Categoria.",
  listDescription: "Listado general de categorias registradas en la base de datos.",
  fields: [
    { name: "nombre_categoria", label: "Nombre de la categoria", type: "text", required: true },
    { name: "rango_edad", label: "Rango de edad", type: "text", required: true },
    { name: "año_competencia", label: "Año de competencia", type: "number", required: true }
  ],
  columns: [
    { label: "Categoria", value: (record) => record.nombre_categoria || "-" },
    { label: "Rango", value: (record) => record.rango_edad || "-" },
    { label: "Temporada", value: (record) => record.año_competencia || "-" }
  ],
  searchable: (record) => [record.nombre_categoria, record.rango_edad, record.año_competencia],
  stats: (state) => {
    const years = new Set(state.records.map((item) => item.año_competencia).filter(Boolean));
    const ranges = new Set(state.records.map((item) => item.rango_edad).filter(Boolean));
    return [state.records.length, years.size, ranges.size, state.editingId ? "Edicion" : "Creacion"];
  }
});
