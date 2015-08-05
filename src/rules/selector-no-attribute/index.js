import selectorParser from "postcss-selector-parser"
import {
  report,
  ruleMessages,
  validateOptions
} from "../../utils"

export const ruleName = "selector-no-attribute"

export const messages = ruleMessages(ruleName, {
  rejected: "Unexpected attribute selector",
})

export default function (o) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual: o })
    if (!validOptions) { return }

    root.eachRule(rule => {
      selectorParser(selectorAST => {
        selectorAST.eachAttribute(() => {
          report({
            message: messages.rejected,
            node: rule,
            ruleName,
            result,
          })
        })
      })
        .process(rule.selector)
    })
  }
}
