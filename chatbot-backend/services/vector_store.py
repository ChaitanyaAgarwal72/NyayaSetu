import numpy as np
from services.embedding_model import EmbeddingModel
import os, pickle, faiss

class VectorStore:
    def __init__(self, index_file=None, chunks_file=None, base_dir="data/cases", case_number=None, case_id=None):
        # Support both case_number and case_id for backward compatibility
        case_identifier = case_number or case_id
        if case_identifier:
            self.base_dir = os.path.join(base_dir, str(case_identifier))
            os.makedirs(self.base_dir, exist_ok=True)
            self.index_file = os.path.join(self.base_dir, "legal.index")
            self.chunks_file = os.path.join(self.base_dir, "chunks.pkl")
        else:
            self.index_file = index_file
            self.chunks_file = chunks_file

        try:
            self.index = faiss.read_index(self.index_file)
            with open(self.chunks_file, "rb") as f:
                self.chunks = pickle.load(f)
        except:
            self.index = None
            self.chunks = []

    def save(self):
        if self.index is not None:
            os.makedirs(os.path.dirname(self.index_file), exist_ok=True)
            faiss.write_index(self.index, self.index_file)
            with open(self.chunks_file, "wb") as f:
                pickle.dump(self.chunks, f)

    def add_document(self, text):
        model = EmbeddingModel.get_model()
        embedding = model.encode([text], convert_to_numpy=True)
        faiss.normalize_L2(embedding)

        if self.index is None:
            dim = embedding.shape[1]
            self.index = faiss.IndexFlatIP(dim)

        self.index.add(embedding)
        self.chunks.append(text)
        self.save()