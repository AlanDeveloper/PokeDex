import ReactDOM from 'react-dom';

const ModalCreate = ({ isShowing, hide, types = [], onSubmit, register, errors, data = {} }) => isShowing ? ReactDOM.createPortal(
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
                    <select id="typeId" {...register("updateTypeId")} defaultValue={data.typeId}>
                        <option value="">Select one</option>
                        {types.map((type, index) => (
                            <option value={type.id} key={index}>{type.name}</option>
                        ))}
                    </select>
                    <p>{errors.updateTypeId?.message}</p>
                    <input type="submit" value="Send" />
                </form>
            </div>
        </div>
    </>, document.body
) : null;

export default ModalCreate;