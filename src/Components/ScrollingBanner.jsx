// import React from "react";
// import "../App.css";
//
//
// function ScrollingBanner() {
// return (
//     <div className="navbar">
//         <div className="sliding-text">
//             משלוח חינם בקנייה מעל 100 ש"ח
//         </div>
//
//     </div>
// );
// }
// export default ScrollingBanner;
import React from "react";
import "./ScrollingBanner.css"; // ייבוא עיצוב מהתיקיה של הקומפוננטה

function ScrollingBanner() {
    return (
        <div className="scrolling-banner">
            <div className="sliding-text">
                משלוח חינם בקנייה מעל 100 ש"ח
            </div>
        </div>
    );
}

export default ScrollingBanner;
