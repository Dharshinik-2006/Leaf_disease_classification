# Leaf Disease Classification

A Flask-based web application that classifies leaf diseases using a deep learning model (ResNet34). Upload an image of a leaf, and the application will predict the disease type and provide relevant information.

## Features

- 🌿 **Disease Classification**: Accurately classify leaf diseases using a pre-trained ResNet34 model
- 🖼️ **Web Interface**: User-friendly web interface for uploading and analyzing leaf images
- 📊 **Real-time Predictions**: Get instant predictions with disease information
- 🎨 **Modern UI**: Responsive design with modern styling

## Project Structure

```
Leaf-Disease-Classification/
├── app.py                          # Flask application main file
├── model.py                        # Model loading and prediction logic
├── utils.py                        # Utility functions and disease information
├── requirements.txt                # Python dependencies
├── Models/
│   └── plantDisease-resnet34.pth   # Pre-trained ResNet34 model
├── static/
│   ├── images/                     # Static images
│   ├── js/
│   │   └── main.js                # JavaScript functionality
│   └── styles/
│       ├── modern-style.css       # Modern CSS styling
│       └── style.css              # Additional styles
├── templates/
│   ├── index.html                 # Home page
│   └── display.html               # Results display page
└── testimages/                     # Test images for demonstration
```

## Requirements

- Python 3.6+
- Flask
- PyTorch
- TorchVision
- Pillow
- NumPy
- Pandas

## Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Dharshinik-2006/Leaf_disease_classification.git
cd Leaf-Disease-Classification
```

2. **Create a virtual environment**:
```bash
python -m venv myenv
```

3. **Activate the virtual environment**:
   - **Windows**:
   ```bash
   myenv\Scripts\Activate.ps1
   ```
   - **macOS/Linux**:
   ```bash
   source myenv/bin/activate
   ```

4. **Install dependencies**:
```bash
pip install -r requirements.txt
```

## Usage

1. **Run the Flask application**:
```bash
python app.py
```

2. **Open your browser** and navigate to:
```
http://127.0.0.1:5000
```

3. **Upload a leaf image**:
   - Click on the upload area or select a file
   - The model will analyze the image
   - View the prediction results and disease information

## Running in Production

To run the application in production using Gunicorn:

```bash
gunicorn --bind 0.0.0.0:8000 app:app
```

## Model Details

- **Architecture**: ResNet34
- **Framework**: PyTorch
- **Input Size**: 224x224 pixels
- **File**: `Models/plantDisease-resnet34.pth`

## Dependencies

All dependencies are listed in `requirements.txt`:
- numpy
- pandas
- Flask
- Pillow
- gunicorn
- torch
- torchvision

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Dharshinik-2006

## Support

For issues or questions, please open an issue on GitHub.

---

**Note**: Ensure you have the pre-trained model file (`plantDisease-resnet34.pth`) in the `Models/` directory before running the application.
