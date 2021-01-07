import { useEffect, useRef, useState } from "react";
import { ChUtils } from 'ch-ui'

interface useOptionFormListHookProps {
  url: string
}

export function useOptionFormListHook({
  url
}:useOptionFormListHookProps) {
  const [list, setList] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(()=>{
    

  }, [])

  return {
    list,
    options
  }
}



export default useOptionFormListHook  
