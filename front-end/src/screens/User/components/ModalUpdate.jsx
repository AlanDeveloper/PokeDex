import ReactDOM from 'react-dom';

const ModalCreate = ({ isShowing, hide, onSubmit, register, errors, data = {} }) => isShowing ? ReactDOM.createPortal(
    <>
        <h1>Update</h1>
        <div aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div>
                <div>
                    <button type="button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={onSubmit}>
                    <input type="text" {...register("updateName")} defaultValue={data.name} placeholder="Type the name" />
                    <p>{errors.updateName?.message}</p>
                    <input type="text" {...register("updateEmail")} defaultValue={data.email} placeholder="Type the email" />
                    <p>{errors.updateEmail?.message}</p>
                    <input type="text" {...register("updateUsername")} defaultValue={data.username} placeholder="Type the username" />
                    <p>{errors.updateUsername?.message}</p>
                    <select {...register("updateAdmin")} defaultValue={data.admin ? "1" : "0"}>
                        <option value="">Select one</option>
                        <option value="0">User</option>
                        <option value="1">Admin</option>
                    </select>
                    <p>{errors.updateAdmin?.message}</p>
                    <input type="submit" value="Send" />
                </form>
            </div>
        </div>
    </>, document.body
) : null;

export default ModalCreate;