# import sys
# from videohash import VideoHash

# dataset_urls = [
#     "https://user-images.githubusercontent.com/64683866/168872267-7c6682f8-7294-4d9a-8a68-8c6f44c06df6.mp4",
#     "https://user-images.githubusercontent.com/64683866/168869109-1f77c839-6912-4e24-8738-42cb15f3ab47.mp4",
#     "https://user-images.githubusercontent.com/64683866/148960165-a210f2d2-6c41-4349-bd8d-a4cb673bc0af.mp4"
#     # "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Ffree-stock-photos%2Fnature%2F&psig=AOvVaw0-nWZVzQlY5M6CK1AtsZjQ&ust=1708941543050000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPCVo76dxoQDFQAAAAAdAAAAABAE",
#     # "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=",
#     # "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_640.jpg"
# ]

# data_to_pass_back = 0

# input = sys.argv[1]
# reference_url = input

# reference_video_hash = VideoHash(url=reference_url)

# for url in dataset_urls:
#     video_hash = VideoHash(url=url)
#     # difference = video_hash - reference_video_hash
#     is_similar = video_hash.is_similar(reference_video_hash)
#     # print(f"Comparison with {url}:")
#     # print(f"Difference: {difference}")
#     print(f"Is similar: {is_similar}")
#     if is_similar:
#         data_to_pass_back = 1
#         # print(data_to_pass_back)
#         break

# output = data_to_pass_back
# print(output)

# with open('output.txt', 'w') as f:
#     f.write(str(output))

# sys.stdout.flush()

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
outputOfAI = 0

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
        outputOfAI = 1
        # print(data_to_pass_back)
        break

print("Output of AI: ", outputOfAI)

# numVolunteerSaysFraud = int(input("Enter the number of volunteers saying no: "))
numVolunteerSaysFraud = 2
# numVolunteerSaysNoFraud = int(input("Enter the number of volunteers saying yes: "))
numVolunteerSaysNoFraud = 2
repuFraud = 0
repuNoFraud = 0

for i in range(numVolunteerSaysFraud):
    # repuPoints = int(input("Enter the Reputation points of {}th volunteer saying no: ".format(i+1)))
    repuPoints = 5
    repuFraud += repuPoints

for i in range(numVolunteerSaysNoFraud):
    # repuPoints = int(input("Enter the Reputation points of {}th volunteer saying yes: ".format(i+1)))
    repuPoints = 1
    repuNoFraud += repuPoints

if repuNoFraud >= repuFraud:
    finalOutput="Not Fraud"
    print("Not Fraud")
else:
    # outputOfAI = int(input("Enter the Output of AI Model: "))
    if outputOfAI == -1:
        finalOutput="Fraud"
        print("Fraud")
    else:
        if outputOfAI == 0:
            finalOutput="Not Fraud"
            print("Not Fraud")
        else:
            finalOutput="Fraud"
            print("Fraud")

data_to_pass_back = finalOutput

sys.stdout.flush()