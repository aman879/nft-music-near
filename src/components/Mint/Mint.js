import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Mint = ({ uploadToPinata, mintNFT }) => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isMinting, setIsMinting] = useState(false);
    const [error, setError] = useState(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'video/*': [] },
        onDrop: (acceptedFiles) => {
            const selectedFile = acceptedFiles[0];
            if (selectedFile.size > 2 * 1024 * 1024) {
                setError("File size exceeds 2 MB limit");
                setFile(null);
            } else {
                setError(null);
                const previewFile = Object.assign(selectedFile, {
                    preview: URL.createObjectURL(selectedFile),
                });
                setFile(previewFile);
            }
        },
    });

    const clearVideo = () => {
        setFile(null);
    };

    const handleMint = async () => {
        if (!file || !name || !description) {
            alert('Please complete all fields');
            return;
        }

        setIsMinting(true);

        try {
            const IpfsHash = await uploadToPinata(file, name, description, price);
            mintNFT(IpfsHash, price);
            clearVideo();
        } catch (e) {
            console.log(e);
        } finally {
            setIsMinting(false);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-white pt-5">
            <h2 className="text-center mb-4 fw-bold">Mint Your Video NFT</h2>

            <div 
                {...getRootProps({ 
                    style: { cursor: 'pointer' },
                    className: `rounded text-center ${file ? 'pb-3' : 'border border-2 border-dashed border-primary p-5 mb-3'}`
                })}
            >
                <input {...getInputProps()} />
                {file ? (
                    <div>
                        <video controls style={{ width: '50vh' }} className=" h-auto rounded">
                            <source src={file.preview} type={file.type} />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ) : (
                    <p className="text-primary">
                        Drag & drop a video file, or click to select one
                        <br />
                        <span className="text-danger fw-bold">Max size: 2 MB</span>
                    </p>
                )}
            </div>

            {error && <p className="text-danger mb-3">{error}</p>}

            {file && (
                <button
                    onClick={clearVideo}
                    className="btn btn-danger mb-3">
                    Clear
                </button>
            )}

            <div className="w-100 mb-3" style={{ maxWidth: '400px' }}>
                <label className="form-label">Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter NFT Name"
                    className="form-control"
                />
            </div>

            <div className="w-100 mb-3" style={{ maxWidth: '400px' }}>
                <label className="form-label">Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter NFT Description"
                    className="form-control"
                />
            </div>

            <div className="w-100 mb-3" style={{ maxWidth: '400px' }}>
                <label className="form-label">Price (in ETH):</label>
                <input
                    id="price"
                    value={price}
                    type="number"
                    required
                    min="0"
                    step="any"
                    inputMode="decimal"
                    placeholder="0.00"
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control"
                />
            </div>

            <button
                onClick={handleMint}
                disabled={isMinting || !!error}
                className={`btn btn-danger ${isMinting ? 'disabled' : 'hover'}`}
                style={{ maxWidth: '400px' }}
            >
                {isMinting ? 'Minting...' : 'Mint NFT'}
            </button>
        </div>
    );
};

export default Mint;
