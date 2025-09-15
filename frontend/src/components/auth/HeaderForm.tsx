import { Notebook } from "lucide-react";

export const HeaderForm = () => {
  return (
    <header className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
        <Notebook className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">TaskNotes</h1>
      <p className="text-slate-600 text-balance">
        Tu espacio personal para organizar ideas y tareas
      </p>
    </header>
  );
};
