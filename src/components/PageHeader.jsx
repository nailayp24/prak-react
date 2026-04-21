export default function PageHeader(props) {
    return (
        <div id="pageheader-container">
            <div id="pageheader-left">
                <span id="page-title">
                    {props.title}
                </span>
                <div id="breadcrumb-links">
                    <span className="text-gray-400 cursor-pointer hover:text-orange-500">Home</span>
                    <span id="breadcrumb-separator">/</span>
                    <span className="text-orange-500 font-semibold">Dashboard Overview</span>
                </div>
            </div>
            <div id="action-button">
                <button id="add-button" className="hover:bg-orange-600 transition-colors">
                    + Create Report
                </button>
            </div>
        </div>
    );
}