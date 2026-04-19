"use client";
import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage as FormikError } from "formik";
import * as Yup from "yup";
import type { NoteTag } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import { useRouter } from "next/router";

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface NoteFormProps {
  onSubmit: (values: NoteFormValues) => void;
  // onSubmit: () => void;
  onCancel: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required("Required"),
  content: Yup.string().max(500),
  tag: Yup.mixed<NoteTag>()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Required"),
});
function NoteForm() {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (formData: FormData) => {
    const note = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as string,
    };
    clearDraft();
    router.back();
  };

  return (
    <form action={handleSubmit}>
      <input name="title" value={draft.title} onChange={handleChange} />

      <textarea name="content" value={draft.content} onChange={handleChange} />

      <select name="tag" value={draft.tag} onChange={handleChange}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <button type="submit">Create</button>
      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
}
// function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: createNote,
//     onSuccess: (data, variables) => {
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//       onSubmit(variables);
//     },
//   });
//   const initialValues: NoteFormValues = {
//     title: "",
//     content: "",
//     tag: "Todo",
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={(values) => mutation.mutate(values)}
//     >
//       <Form className={css.form}>
//         <div className={css.formGroup}>
//           <label htmlFor="title">Title</label>
//           <Field id="title" type="text" name="title" className={css.input} />
//           <FormikError name="title" component="span" className={css.error} />
//         </div>

//         <div className={css.formGroup}>
//           <label htmlFor="content">Content</label>
//           <Field
//             as="textarea"
//             id="content"
//             name="content"
//             rows={8}
//             className={css.textarea}
//           />
//           <FormikError name="content" component="span" className={css.error} />
//         </div>

//         <div className={css.formGroup}>
//           <label htmlFor="tag">Tag</label>
//           <Field as="select" id="tag" name="tag" className={css.select}>
//             <option value="Todo">Todo</option>
//             <option value="Work">Work</option>
//             <option value="Personal">Personal</option>
//             <option value="Meeting">Meeting</option>
//             <option value="Shopping">Shopping</option>
//           </Field>
//           <FormikError name="tag" component="span" className={css.error} />
//         </div>

//         <div className={css.actions}>
//           <button type="button" className={css.cancelButton} onClick={onCancel}>
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className={css.submitButton}
//             disabled={mutation.isPending}
//           >
//             {mutation.isPending ? "Creating..." : "Create note"}
//           </button>
//         </div>
//       </Form>
//     </Formik>
//   );
// }

export default NoteForm;
