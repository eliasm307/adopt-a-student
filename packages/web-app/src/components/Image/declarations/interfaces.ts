import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks';

export interface ImageEdge {
  node?: ImageNode;
}

export interface ImageNode extends FileNode {
  name?: string;
  relativePath?: string;
}

export interface HasSrc {
  /** Resolved file path */
  src: string;
}

export interface ImageQueryData {
  allFile: {
    edges: ImageEdge[];
  };
}
