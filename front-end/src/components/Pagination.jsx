export default function Pagination({total, offset, setOffset, limit}) {

    const createButtons = () => {
        let array = [];

        for (let i = 0; i < Math.ceil(total / limit); i++) {
            array.push(<button onClick={() => setOffset(i * limit)} key={i}>{i + 1}</button>);
        }
        return array;
    };

    return (
        <div>
            {createButtons()}
        </div>
    );
}