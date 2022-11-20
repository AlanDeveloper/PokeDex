import ReactDOM from 'react-dom';

const ModalCreate = ({ isShowing, hide, pokemons = [], onSubmit, register, errors }) => isShowing ? ReactDOM.createPortal(
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
                    <select {...register("createPokemonId")}>
                        <option value="">Select one</option>
                        {pokemons.map((pokemon, index) => (
                            <option value={pokemon.id} key={index}>{pokemon.name}</option>
                        ))}
                    </select>
                    <p>{errors.createPokemonId?.message}</p>
                    <input type="submit" value="Send" />
                </form>
            </div>
        </div>
    </>, document.body
) : null;

export default ModalCreate;