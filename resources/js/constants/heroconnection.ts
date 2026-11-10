export const HERO_CONNECTIONS = [
    {
        id: "top",
        className: "top-[18%] left-1/2 h-[18%] w-px -translate-x-1/2",
        direction: "forward",
    },
    {
        id: "top-left",
        className: "top-[30%] left-[25%] h-[18%] origin-top-left rotate-[-50deg] w-px -translate-x-1/4",
        direction: "forward",
    },
    {
        id: "top-right",
        className: "top-[30%] right-[25%] h-[18%] origin-top-right rotate-[50deg] w-px -translate-x-1/4",
        direction: "forward",
    },
    {
        id: "bottom-left",
        className: "bottom-[30%] left-[25%] h-[18%] origin-bottom-left rotate-[60deg] w-px -translate-x-1/4",
        direction: "reverse",
    },
    {
        id: "bottom-right",
        className: "bottom-[30%] right-[25%] h-[18%] origin-bottom-right rotate-[-60deg] w-px -translate-x-1/4",
        direction: "reverse",
    },
    {
        id: "bottom",
        className: "bottom-[18%] left-1/2 h-[18%] w-px -translate-x-1/2",
        direction: "reverse",
    },
] as const;