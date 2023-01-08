import React, {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {Box, Button, TextField, useTheme} from "@mui/material";

import Header from "../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import {tokens} from "../theme";

const SortableItem = SortableElement(({value, index, onDelete}) => {
    return (
        <div>
            <img src={value} alt={`uploaded photo ${index}`}/>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
});

const SortableList = SortableContainer(({items, onDelete}) => {
    return (
        <div>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} onDelete={() => onDelete(index)}/>
            ))}
        </div>
    );
});

function Sheet() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [photos, setPhotos] = useState([]);

    const onDrop = acceptedFiles => {
        setPhotos([...photos, ...acceptedFiles.map(file => URL.createObjectURL(file))]);
    };

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    const onSortEnd = ({oldIndex, newIndex}) => {
        setPhotos(arrayMove(photos, oldIndex, newIndex));
    };

    const handleDelete = index => {
        setPhotos(photos.filter((photo, i) => i !== index));
    };

    return (
        <Box m="20px">
            <Header
                title="SHEETS"
                subtitle="Upload sheet music and edit order"
            />
            <Box>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {/*<p>Drag and drop photos here, or click to select photos</p>*/}
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{mr: "10px"}}/>
                        Drag and drop photos here
                    </Button>
                </div>
            </Box>
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                <div>
                    {photos.length > 0 && (
                        <SortableList items={photos} onSortEnd={onSortEnd} onDelete={handleDelete}/>
                    )}
                </div>
                </Box>
            </Box>
        </Box>
    );
}

export default Sheet;