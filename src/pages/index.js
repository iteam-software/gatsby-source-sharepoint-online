import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export default function index() {
  const data = useStaticQuery(graphql`
    {
      allTestSharePointSitePeopleListItem {
        nodes {
          id
          data {
            webUrl
            fields {
              Person
              Workplace {
                displayName
                address {
                  city
                  countryOrRegion
                  postalCode
                  state
                  street
                }
                locationUri
              }
            }
          }
        }
      }
    }
  `);

  const items = data.allTestSharePointSitePeopleListItem.nodes.map((node) => {
    return (
      <li key={node.id}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <a href={node.data.webUrl} target="_blank" role="heading">
            {node.data.fields.Person}
          </a>
          <div>{node.data.fields.Workplace.displayName}</div>
          <address>
            {node.data.fields.Workplace.address.street}
            <br />
            {node.data.fields.Workplace.address.city},{" "}
            {node.data.fields.Workplace.address.state}
            <br />
            {node.data.fields.Workplace.address.zip}
          </address>
        </div>
      </li>
    );
  });

  return <ul>{items}</ul>;
}
