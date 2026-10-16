import type { SummarizeOutputDTO, TranslateInputDTO, summarizeInputDTO, ModeInputDTO, ModeOutputDTO } from "@/app/types";
import { useAuth } from "@clerk/react";
import { useCallback } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001";

  function useHandleSummarize() {
  const { getToken } = useAuth();

  const summarize = useCallback(async (input: summarizeInputDTO) => {
    const token = await getToken();

    if (!token) {
      console.log("No token provided");
      return null;
    }

    const response = await fetch(
      `${API_URL}/api/ai/summarize`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      return null;
    }

    const data: SummarizeOutputDTO = await response.json();

    return data.result;
  }, [getToken]);

  return { summarize };
}
  function useHandleTranslate() {
    const { getToken } = useAuth();
  
    const translate = useCallback(async (input: TranslateInputDTO) => {
      const token = await getToken();
  
      if (!token) {
        console.log("No token provided");
        return null;
      }
  
      const response = await fetch(
        `${API_URL}/api/ai/translate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );
  
      if (!response.ok) {
        return null;
      }
  
      const data: SummarizeOutputDTO = await response.json();
  
      return data.result;
    }, [getToken]);
  
    return { translate };
  }


  function useHandleMode() {
    const { getToken } = useAuth();
  
    const rewriteModeText = useCallback(async (input: ModeInputDTO) => {
      const token = await getToken();
  
      if (!token) {
        console.log("No token provided");
        return null;
      }
  
      const response = await fetch(
        `${API_URL}/api/ai/rewrite`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );
  
      if (!response.ok) {
        return null;
      }
  
      const data: ModeOutputDTO = await response.json();
  
      return data.result;
    }, [getToken]);
  
    return { rewriteModeText };
  }










  export { useHandleSummarize, useHandleTranslate, useHandleMode };