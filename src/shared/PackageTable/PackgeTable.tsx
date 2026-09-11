import React from "react";
import "./PackageTable.scss";

interface Product {
  id: number;
  title: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  type: "private" | "company";
}

interface PackageComparisonTableProps {
  products: Product[];
}

export const PackageTable = ({
  products,
}: PackageComparisonTableProps) => {
  return (
    <div className="package-comparison-table">
      <table>
        <thead>
          <tr>
            <th>Capability</th>

            {products.map((product) => (
              <th key={product.id}>
                {product.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>Users</th>
            <td>1</td>
            <td>3</td>
            <td>10</td>
            <td>Unlimited</td>
          </tr>

          <tr>
            <th>Storage</th>
            <td>10 GB</td>
            <td>50 GB</td>
            <td>250 GB</td>
            <td>Unlimited</td>
          </tr>

          <tr>
            <th>Analytics</th>
            <td>Basic</td>
            <td>Basic</td>
            <td>Advanced</td>
            <td>Advanced</td>
          </tr>

          <tr>
            <th>Integrations</th>
            <td>—</td>
            <td>2</td>
            <td>5</td>
            <td>Unlimited</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};