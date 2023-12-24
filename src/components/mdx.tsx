import Link from "next/link";
import { cn } from "@/lib/utils";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { Alert, AlertDescription } from "./ui/alert";
import { Lightbulb } from "lucide-react";
import "highlight.js/styles/github-dark-dimmed.min.css";
import { Tweet } from "react-tweet";

const components: Components = {
  h1: ({ className, node: _n, ...props }) => (
    <h1 className={cn("mb-4 mt-6 text-3xl font-bold", className)} {...props} />
  ),
  h2: ({ className, node: _n, ...props }) => (
    <h2
      className={cn("mb-4 mt-6 text-2xl font-semibold", className)}
      {...props}
    />
  ),
  h3: ({ className, node: _n, ...props }) => (
    <h3
      className={cn("mb-4 mt-6 text-xl font-semibold", className)}
      {...props}
    />
  ),
  h4: ({ className, node: _n, ...props }) => (
    <h4 className={cn("text-lg font-semibold", className)} {...props} />
  ),
  h5: ({ className, node: _n, ...props }) => (
    <h5 className={cn("text-sm font-semibold", className)} {...props} />
  ),
  h6: ({ className, node: _n, ...props }) => (
    <h6 className={cn("text-base font-semibold", className)} {...props} />
  ),
  a: ({ className, href, node, ref, ...props }) => {
    // { "type": "text", "value": "https://www.youtube.com/watch?v=FnmZhXWohP0" }
    // { "type": "element", "tagName": "a", "properties": { "href": "https://twitter.com/mattpocockuk/status/1699507864895738143" }

    // if node.properties.href is a string and includes twitter.com then extract the tweet id
    if (
      typeof node?.properties.href === "string" &&
      node?.properties.href.includes("twitter.com")
    ) {
      const tweetId = node?.properties.href.split("/").pop();

      if (!tweetId) return null;

      return <Tweet id={tweetId} />;
    }

    return (
      <Link
        className={cn("underline underline-offset-4", className)}
        href={href ?? ""}
        {...props}
      />
    );
  },
  strong: ({ className, node: _n, ...props }) => (
    <strong className={cn("font-bold", className)} {...props} />
  ),
  p: (props) => {
    // if (node?.properties?.text === "%[") return null;
    // return <p>{JSON.stringify(node, null, 2)}</p>;

    // console.log(props.node);

    return <p className={cn("my-4", props.className)} {...props} />;
  },
  ul: ({ className, node: _n, ...props }) => (
    <ul className={cn("ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, node: _n, ...props }) => (
    <ol className={cn("ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, node: _n, ...props }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, node: _n, ...props }) => (
    <blockquote
      className={cn("my-3 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn("rounded-md inline-block", className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  pre: ({ className, node: _n, ...props }) => (
    <pre
      className={cn("mt-6 mb-4 p-4 overflow-x-auto rounded-lg", className)}
      {...props}
    />
  ),
  code: ({ className, children, node, ...props }) => {
    const isMultiline = node?.children?.length ?? 0 > 1;
    if (isMultiline) {
      const { className } = node?.properties ?? {};
      return (
        <code className={(className as string[])?.join(" ")}>{children}</code>
      );
    }
    return (
      <code
        className={cn(
          "mx-1 py-[0.2rem] px-[0.3rem] align-middle bg-opacity-25 relative rounded font-mono text-sm",
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  },
  div: (props) => {
    if (props.node?.properties.dataNodeType === "callout-emoji") {
      return null;
    }
    if (props.node?.properties.dataNodeType === "callout-text") {
      return (
        <Alert className="my-8">
          <Lightbulb />
          <AlertDescription>{props.children}</AlertDescription>
        </Alert>
      );
    }

    return <div {...props} />;
  },
};

interface MdxProps {
  code: string;
  baseUri?: string;
}

export function Mdx({ code, baseUri }: MdxProps) {
  const transformLink = (href: string) => {
    if (href.startsWith("http")) {
      return href;
    }
    return baseUri ? `${baseUri}${href}` : href;
  };

  const transformEmbeds = (code: string) => {
    return code.replace(/%\[(.*?)\]/g, "$1");
  };

  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeRaw,
        rehypeSlug,
        rehypeAutolinkHeadings,
        // @ts-expect-error
        ...(code.includes("```") ? [[rehypeHighlight, { detect: true }]] : []),
      ]}
      urlTransform={transformLink}
      className="mdx"
    >
      {transformEmbeds(code)}
    </ReactMarkdown>
  );
}
