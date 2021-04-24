import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

import { ImageQueryData } from './declarations/interfaces';

interface Props {
  alt: string;
  className?: string;
  imgStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  src: string;
}

const Image = ({ src, alt, ...restProps }: Props) => {
  const data: ImageQueryData = useStaticQuery(graphql`
    {
      allFile(filter: { ext: { in: [".jpeg", ".jpg", ".png", ".webp"] } }) {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                placeholder: BLURRED
                quality: 50
              )
            }
          }
        }
      }
    }
  `);

  // get image node from map if it exists
  const imageEdge = data.allFile.edges.find(
    (edge) => edge.node?.relativePath === src
  );

  if (!imageEdge) {
    console.error(__filename, "Image not found", { src });
    return null;
  }

  // const imageFluid = image.node.childImageSharp.fluid;
  // const imageData = getImage(imageEdge as FileNode);
  const imageData = imageEdge.node?.childImageSharp?.gatsbyImageData;

  if (!imageData) {
    console.error(__filename, "Could not get image data", { imageEdge });
    return null;
  }

  console.log("Image", `Found image for path ${src}`);

  return <GatsbyImage alt={alt} image={imageData} {...restProps} />;
};

export default Image;
