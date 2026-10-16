 type Note = {
    id: string;
    userId: string;
    title: string;
    content: string;
    summary: string | null;
    createdAt: string;
    updatedAt: string;
  };

  type CreateNoteType={
    title: string,
    content: string,
  }
  type UpdateNoteType={
    title?: string,
    content?: string, // optional because we can update only one field at a time
  }

  type autosavestatus= "unsaved" | "saving..." | "saved" | "initial"


  type summarizeInputDTO={
    noteId?: string,
    text?: string,
  }
  type SummarizeOutputDTO={
    result: string,
  }
 
  type SummarizeInputDTO = {
    noteId?: string;
    text?: string;
  };
  
  type TranslateInputDTO = {
    noteId?: string;
    text?: string;
  };
  type ModeInputDTO = {
    noteId?: string;
    text?: string;
    mode: rewriteMode
  };
  type rewriteMode = 'comedy' | 'formal' | 'casual';
  type ModeOutputDTO = {
    result: string;
  };

  export type { Note, CreateNoteType, UpdateNoteType, autosavestatus, summarizeInputDTO, SummarizeOutputDTO, SummarizeInputDTO, TranslateInputDTO, ModeInputDTO, ModeOutputDTO, rewriteMode }

  
