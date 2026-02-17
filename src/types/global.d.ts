declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "react-toastify/dist/ReactToastify.css";

declare module "typewriter-effect/dist/core" {
  interface TypewriterOptions {
    strings?: string[];
    cursor?: string;
    delay?: number;
    deleteSpeed?: number;
    loop?: boolean;
    autoStart?: boolean;
  }
  
  class Typewriter {
    constructor(element: HTMLElement, options?: TypewriterOptions);
    typeString(text: string): this;
    deleteAll(speed?: number): this;
    pauseFor(duration: number): this;
    start(): this;
    stop(): this;
  }
  
  export default Typewriter;
}
