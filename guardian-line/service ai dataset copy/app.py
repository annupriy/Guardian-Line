from videohash import VideoHash

# URLs of videos in your dataset
dataset_urls = [
    "https://user-images.githubusercontent.com/64683866/168872267-7c6682f8-7294-4d9a-8a68-8c6f44c06df6.mp4",
    "https://user-images.githubusercontent.com/64683866/168869109-1f77c839-6912-4e24-8738-42cb15f3ab47.mp4",
    "https://user-images.githubusercontent.com/64683866/148960165-a210f2d2-6c41-4349-bd8d-a4cb673bc0af.mp4"
]

# URL of the reference video
reference_url = "https://user-images.githubusercontent.com/64683866/168872267-7c6682f8-7294-4d9a-8a68-8c6f44c06df6.mp4"
reference_video_hash = VideoHash(url=reference_url)

# Iterate over each video in the dataset and compare with the reference video
for url in dataset_urls:
    video_hash = VideoHash(url=url)
    difference = video_hash - reference_video_hash
    is_similar = video_hash.is_similar(reference_video_hash)
    print(f"Comparison with {url}:")
    print(f"Difference: {difference}")
    print(f"Is similar: {is_similar}")
