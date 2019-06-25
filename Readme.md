# Task 1

```
function findHigherIndex(s, a, b) {
    return Array.from(s).reduce((prev, char, index) => {
        return [a, b].includes(char) ? index : prev;
    }, -1);
}
```

# Task 2
## Libs stack:
- **babel** - Transpile es6 into native javasacript
- **react** - Create/render ui components
- **react-router** - Navigate through the app
- **typescript** - Strict types
- **webpack** - Compile application and run dev-server