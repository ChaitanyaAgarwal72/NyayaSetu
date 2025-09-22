from sentence_transformers import SentenceTransformer

class EmbeddingModel:
    _instance = None
    
    @classmethod
    def get_model(cls, model_name="bhavyagiri/InLegal-Sbert"):
        if cls._instance is None:
            print(f"Loading embedding model: {model_name}")
            cls._instance = SentenceTransformer(model_name)
        return cls._instance