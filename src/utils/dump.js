import { useMemo } from "react";

const options = useMemo(() => {
    return {
        b: true,
        str: "String",
    }
}, []);   // wont be recomputed