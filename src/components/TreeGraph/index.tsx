import React, { useContext } from "react"
import dynamic from "next/dynamic"

import styles from "./styles.module.css"
import { ContextTree } from "../../contexts/ContextTree"
import { CgMaximizeAlt } from "react-icons/cg"
import { FiX } from "react-icons/fi"

import ReactModal from "react-modal"

const Tree = dynamic(() => import("react-d3-tree"))

export const TreeGraph: React.FC = () => {
  const {
    treeRawNodeDatum,
    handleModalClose,
    setHandleModalClose
  } = useContext(ContextTree)

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
            disabled={!treeRawNodeDatum}
            onClick={() => setHandleModalClose(c => !c)}
          >
            {handleModalClose ? <FiX /> : <CgMaximizeAlt />}
          </button>
          {treeRawNodeDatum && (
            <Tree
              data={treeRawNodeDatum}
              orientation="vertical"
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
          disabled={!treeRawNodeDatum}
          onClick={() => setHandleModalClose(c => !c)}
        >
          {handleModalClose ? <FiX /> : <CgMaximizeAlt />}
        </button>
        {treeRawNodeDatum && (
          <Tree
            data={treeRawNodeDatum}
            orientation="vertical"
            translate={{
              x: 240,
              y: 30
            }}
            nodeSize={{ x: 130, y: 180 }}
          />
        )}
      </div>
    </div>
  )
}
