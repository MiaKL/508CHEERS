import React from 'react'

function AdminButtonCreate({onCreate}) {
    return (
        <div className="position-absolute top-0 end-0 p-3">
            <button className="btn me-2 btn-info" onClick={onCreate}>
                <i className="bi bi-pencil-square"></i> New
            </button>
        </div>
    );
}

export default AdminButtonCreate;