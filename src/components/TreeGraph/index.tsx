import React, { ReactNode, useState } from "react"
import dynamic from "next/dynamic"

import styles from "./styles.module.css"
import { CgMaximizeAlt } from "react-icons/cg"
import { FiX } from "react-icons/fi"

import ReactModal from "react-modal"

const Tree = dynamic(() => import("react-d3-tree"))

interface RawNodeDatum {
  name: string;
  attributes?: Record<string, string>;
  children?: RawNodeDatum[];
}

interface TreeGraphProps{
  data: RawNodeDatum;
  children?: ReactNode
}

export const TreeGraph = ({ data }: TreeGraphProps) => {
  const [handleModalClose, setHandleModalClose] = useState(false)

  return (
    <div>
      <ReactModal
        style={{ content: { overflow: "hidden", padding: '0' } }}
        isOpen={handleModalClose}
        onRequestClose={() => setHandleModalClose(c => !c)}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
      >
        <div
          id="treeWrapper"
          className={styles.treeContainerModal}
        >
          <button
            type="button"
            className={styles.button}
            disabled={!data}
            onClick={() => setHandleModalClose(c => !c)}
          >
            {handleModalClose ? <FiX /> : <CgMaximizeAlt />}
          </button>
          {data && (
            <Tree
              data={data}
              orientation="vertical"
              scaleExtent={{min: 0.1, max: 8}}
              translate={{
                x: 240,
                y: 30
              }}
              nodeSize={{ x: 130, y: 180 }}
            />
          )}
        </div>
      </ReactModal>

      <div
        id="treeWrapper"
        className={styles.treeContainer}
      >
        <button
          type="button"
          className={styles.button}
          disabled={!data}
          onClick={() => setHandleModalClose(c => !c)}
        >
          {handleModalClose ? <FiX /> : <CgMaximizeAlt />}
        </button>
        {data && (
          <Tree
            data={data}
            orientation="vertical"
            scaleExtent={{min: 0.1, max: 8}}
            translate={{
              x: 240,
              y: 30
            }}
            nodeSize={{ x: 180, y: 190 }}
          />
        )}
      </div>
    </div>
  )
}
