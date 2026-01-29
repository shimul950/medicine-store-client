

const medicinePage = async() => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return (
        <div>
            <h1>this is medicines page</h1>
        </div>
    );
};

export default medicinePage;