import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export default function index() {
  const data = useStaticQuery(graphql`
    {
      allGatsbySourceTestTestimonialsListItem {
        nodes {
          id
          data {
            webUrl
            fields {
              LoanOfficer
            }
          }
        }
      }
    }
  `);

  const items = data.allGatsbySourceTestTestimonialsListItem.nodes.map((node) => {
    return (
      <li key={node.id}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <a href={node.data.webUrl} target="_blank" role="heading">
            {node.data.fields.LoanOfficer}
          </a>
        </div>
      </li>
    );
  });

  return <ul>{items}</ul>;
}
