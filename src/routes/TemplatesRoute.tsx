import React from "react";
import {LOCALSTORAGE_OPENAI_KEY} from "../constants/assets-constants";
import OpenaiKeyInput from "../components/templates/OpenaiKeyInput";
import OpenaiTemplateRequest from "../components/templates/OpenaiTemplateRequest";

export function Component() {
    const openaiKey = window.localStorage.getItem(LOCALSTORAGE_OPENAI_KEY)

    return openaiKey == null
        ? <OpenaiKeyInput/>
        : <OpenaiTemplateRequest openaiKey={openaiKey}/>
}

