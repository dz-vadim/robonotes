import React from 'react';
import "./styles/App.css";
import TodoContainer from "./components/TodoContainer";
import SummaryTable from "./components/SummaryTable";

const App = () => {
    // var request = require("request");
    //
    // var options = { method: 'GET',
    //     url: 'https://robonotes-5f3c.restdb.io/rest/todos',
    //     headers:
    //         { 'cache-control': 'no-cache',
    //             'x-apikey': '69f2ef2a30077e770a6c720cd506045527d40' } };
    //
    // request(options, function (error: string, response : string, body: string) {
    //     if (error) throw new Error(error);
    //
    //     console.log(body);
    // });

    return (
        <div>
            <TodoContainer/>
        </div>
    );
};

export default App;