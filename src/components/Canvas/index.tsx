import React from 'react';
import dynamic from 'next/dynamic'

const Tree = dynamic(() => import('react-d3-tree'))

interface RawNodeDatum {
  name: string;
  attributes?: Record<string, string>;
  children?: RawNodeDatum[];
}

export const Canvas: React.FC = () => {
  const orgChart = {
    name: 'CEO',
    children: [
      {
        name: 'Manager',
        attributes: {
          department: 'Production',
        },
        children: [
          {
            name: 'Foreman',
            attributes: {
              department: 'Fabrication',
            },
            children: [
              {
                name: 'CEO',
                children: [
                  {
                    name: 'Manager',
                    attributes: {
                      department: 'Production',
                    },
                    children: [
                      {
                        name: 'Foreman',
                        attributes: {
                          department: 'Fabrication',
                        },
                        children: [
                          {
                            name: 'Worker',
                          },
                        ],
                      },
                      {
                        name: 'Foreman',
                        attributes: {
                          department: 'Assembly',
                        },
                        children: [
                          {
                            name: 'Worker',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Foreman',
            attributes: {
              department: 'Assembly',
            },
            children: [
              {
                name: 'Worker',
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div
      id="treeWrapper"
      style={{ width: '100%', height: '100%' }}>
      <Tree
        data={orgChart}
        orientation="vertical"
        translate={{
          x: 207,
          y: 17
        }}
        />
    </div>
  );
}

