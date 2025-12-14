import React from 'react'

function AdminButtons({onEdit, onDelete}) {
    return (
        <div className="position-absolute top-0 end-0 p-3">
            <button className="btn me-2 edit_button" onClick={onEdit}>
                <i className="bi bi-pencil-square"></i> Edit
            </button>
            <button className="btn btn-danger" onClick={onDelete}>
                <i className="bi bi-trash"></i> Delete
            </button>
        </div>
    );
}

export default AdminButtons;