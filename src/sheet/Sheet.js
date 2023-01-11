import React, {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {Box, Button, TextField, useTheme} from "@mui/material";

import Header from "../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import {tokens} from "../theme";

const SortableItem = SortableElement(({value, index, onDelete}) => {
    const theme = useTheme();

    const colors = tokens(theme.palette.mode);

    return (
        <div>
            <img width="100%" height="100%" src={value} alt={`uploaded photo ${index}`}/>
            <span>

            <Button
                onClick={onDelete}
                sx={{
                    backgroundColor: colors.greenAccent[700],
                    color: colors.grey[100],
                    fontSize: "15px",
                    fontWeight: "bold",
                    padding: "1px 1px",
                    left: '5px',
                    bottom: '43px'
                }}>
                Delete
            </Button>
            </span>
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
            <Box
                sx={{
                    display: 'flex',
                    height: '85vh',
                    width: '92vw',
                    backgroundColor: colors.primary[400],

                }}
            >
                <Box flex="3"
                     display="flex"
                     flexDirection="column"
                     height="100%"
                     border="1px solid yellow"
                >
                    <Box display='flex' alignItems='center' justifyContent='center' flex='1'
                         {...getRootProps()}>
                        <div>
                            <input {...getInputProps()}  />
                            {/*<p>Drag and drop photos here, or click to select photos</p>*/}
                            <Button
                                sx={{
                                    backgroundColor: colors.blueAccent[700],
                                    color: colors.grey[100],
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    padding: "30px 50px",
                                }}
                            >
                                <DownloadOutlinedIcon sx={{mr: "10px"}}/>
                                Drag and drop photos here
                            </Button>
                        </div>
                    </Box>
                    <Box flex='5' border="1px solid yellow"></Box>
                </Box>
                <Box flex="1" height='100%' display='flex' flexWrap='wrap' minWidth='300px' maxWidth='300px'
                     border="1px solid yellow" overflow='auto'>
                    {photos.length > 0 && (
                        <SortableList items={photos} onSortEnd={onSortEnd} onDelete={handleDelete}/>
                    )}
                </Box>

            </Box>

        </Box>
    );
}

export default Sheet;