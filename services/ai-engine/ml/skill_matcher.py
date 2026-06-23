import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class SkillMatcher:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english', lowercase=True)
        # In a real scenario, this corpus would be pulled from MongoDB
        self.mock_corpus = [
            {"provider_id": "user_101", "name": "Alice", "offered": "Advanced React.js and Next.js UI development"},
            {"provider_id": "user_102", "name": "Bob", "offered": "Calculus, Linear Algebra, and Engineering Math"},
            {"provider_id": "user_103", "name": "Charlie", "offered": "UI/UX Design, Figma prototyping, Graphic Design"},
            {"provider_id": "user_104", "name": "Diana", "offered": "Python scripting, Django backend, FastAPI"},
            {"provider_id": "user_105", "name": "Eve", "offered": "Guitar lessons, Music theory, Vocals"},
            {"provider_id": "user_106", "name": "Frank", "offered": "Machine Learning, Data Science, NumPy, Pandas"},
            {"provider_id": "user_107", "name": "Grace", "offered": "Frontend Web Development, HTML, CSS, JavaScript framework"},
        ]
        
        # Fit vectorizer with corpus
        self.df = pd.DataFrame(self.mock_corpus)
        self.corpus_vectors = self.vectorizer.fit_transform(self.df['offered'])

    def find_matches(self, wanted_skill: str, top_k: int = 3):
        if not wanted_skill:
            return []

        # Vectorize the requested skill
        query_vector = self.vectorizer.transform([wanted_skill])
        
        # Calculate cosine similarity against all offered skills
        similarities = cosine_similarity(query_vector, self.corpus_vectors)[0]
        
        # Get top K indices
        top_indices = np.argsort(similarities)[::-1][:top_k]
        
        results = []
        for idx in top_indices:
            score = float(similarities[idx])
            if score > 0.1:  # Threshold to ignore completely irrelevant matches
                match = self.df.iloc[idx].to_dict()
                match['match_score_percentage'] = round(score * 100, 1)
                results.append(match)
                
        return results

# Singleton instance
matcher = SkillMatcher()
