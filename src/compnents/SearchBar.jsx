import React, { useState } from "react";
import { Paper, TextField } from "@material-ui/core";

export const SearchBar = ({ onSubmit, onHandleSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        if (searchTerm) {
            onHandleSearch(true);
        }
    };

    const onKeyPress = (event) => {
        if (event.key === "Enter") {
            onSubmit(searchTerm);
        }
    }

    return (
        <Paper elevation={6} style={{ padding: "25px" }}>
            <TextField
                fullWidth
                label="Search..."
                value={searchTerm}
                onChange={handleChange}
                onKeyPress={onKeyPress}
            />
        </Paper>
    );
};
