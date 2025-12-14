import { useMemo } from 'react'
import { extractVariables } from '../nodes/base/node.utils'

export const useTextVariables = (text, nodeId) => {
  return useMemo(() => {
    const vars = extractVariables(text)

    return vars.map((variable, index) => {
    const v = variable.trim();
    return {
      id: `${nodeId}-${v}`,
      top: `${((index + 1) * 100) / (vars.length + 1)}%`,
    };
  });
  }, [text, nodeId])
}