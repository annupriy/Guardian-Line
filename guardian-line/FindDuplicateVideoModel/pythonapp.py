import sys
from videohash import VideoHash

dataset_urls = [
    "https://user-images.githubusercontent.com/64683866/168872267-7c6682f8-7294-4d9a-8a68-8c6f44c06df6.mp4",
    "https://user-images.githubusercontent.com/64683866/168869109-1f77c839-6912-4e24-8738-42cb15f3ab47.mp4",
    "https://user-images.githubusercontent.com/64683866/148960165-a210f2d2-6c41-4349-bd8d-a4cb673bc0af.mp4"
    # "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Ffree-stock-photos%2Fnature%2F&psig=AOvVaw0-nWZVzQlY5M6CK1AtsZjQ&ust=1708941543050000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPCVo76dxoQDFQAAAAAdAAAAABAE",
    # "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=",
    # "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_640.jpg"
]

data_to_pass_back = ''

input = sys.argv[1]
reference_url = input

reference_video_hash = VideoHash(url=reference_url)

for url in dataset_urls:
    video_hash = VideoHash(url=url)
    # difference = video_hash - reference_video_hash
    is_similar = video_hash.is_similar(reference_video_hash)
    # print(f"Comparison with {url}:")
    # print(f"Difference: {difference}")
    print(f"Is similar: {is_similar}")
    if is_similar:
        data_to_pass_back = "Similar Video Found"
        # print(data_to_pass_back)
        break

output = data_to_pass_back
print(output)

sys.stdout.flush()