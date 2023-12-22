import React, {FC, useCallback} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArchive, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";

const NoteToolBar: FC = () => {
    return (
        <div>
            <button>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button>
                <FontAwesomeIcon icon={faArchive} />
            </button>
            <button >
                <FontAwesomeIcon icon={faTrash} />
            </button>

        </div>
    );
};

export default NoteToolBar;