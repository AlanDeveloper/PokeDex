import ReactDOM from 'react-dom';

const ModalCreate = ({ isShowing, hide, onSubmit, register, errors }) => isShowing ? ReactDOM.createPortal(
    <>
        <h1>Create</h1>
        <div aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div>
                <div>
                    <button type="button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={onSubmit}>
                    <input type="text" {...register("createName")} placeholder="Type the name" />
                    <p>{errors.createName?.message}</p>
                    <select id="typeId" {...register("createStatus")}>
                        <option value="">Select one</option>
                        <option value="0">Inactive</option>
                        <option value="1">Active</option>
                    </select>
                    <p>{errors.createStatus?.message}</p>
                    <input type="submit" value="Send" />
                </form>
            </div>
        </div>
    </>, document.body
) : null;

export default ModalCreate;