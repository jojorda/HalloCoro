package handlers

import (
	dto "backend/dto/result"
	usersdto "backend/dto/users"
	"backend/models"
	"backend/repositories"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	
	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	// "github.com/go-playground/validator/translations/id"
	"github.com/go-playground/validator/v10"

	// "github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type handler struct {
	UserRepository repositories.UserRepository
}

func HandlerUser(UserRepository repositories.UserRepository) *handler {
	return &handler{UserRepository}
}

func (h *handler) CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(usersdto.CreateUserRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	user := models.User{
		Name:     request.Name,
		Email:    request.Email,
		Password: request.Password,
		Phone:    request.Phone,
		Address:  request.Address,
	}

	data, err := h.UserRepository.CreateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data)}
	json.NewEncoder(w).Encode(response)
}

func (h *handler) FindUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	users, err := h.UserRepository.FindUsers()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}
	
	for i, p := range users {
		imagePath := os.Getenv("PATH_FILE") + p.Image
		users[i].Image = imagePath
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: users}
	json.NewEncoder(w).Encode(response)
}

func (h *handler) GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		// response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(err.Error())
		return
	}
	 user.Image = os.Getenv("PATH_FILE") + user.Image

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: user}
	json.NewEncoder(w).Encode(response)
}

func convertResponse(u models.User) usersdto.UserResponse {
	return usersdto.UserResponse{
		ID:       u.ID,
		Name:     u.Name,
		Email:    u.Email,
		Password: u.Password,
		Phone:    u.Phone,
	}
}

func (h *handler) UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	//Mengambil struct dari dto
	request := new(usersdto.UpdateUserRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		//Encoder seperti kode morse di pramuka
		json.NewEncoder(w).Encode(response)
		return
	}
	
	// dataContex := r.Context().Value("dataFile")
	// filename := dataContex.(string)
	// dataContex := r.Context().Value("dataFile")
	// filepath := dataContex.(string)

	// request := usersdto.UpdateUserRequest{
	// 	Name:    r.FormValue("name"),
	// 	Email:   r.FormValue("email"),
	// 	Phone:   r.FormValue("phone"),
	// 	Image:   filepath,
	// 	Address: r.FormValue("address"),
	// 	Gender:  r.FormValue("gender"),
	// }

	// var ctx = context.Background()
	// var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	// var API_KEY = os.Getenv("API_KEY")
	// var API_SECRET = os.Getenv("API_SECRET")
	// // Add your Cloudinary credentials ...
	// cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// // Upload file to Cloudinary ...
	// resp, err := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "HalloCorona"})

	// if err != nil {
	// 	fmt.Println(err.Error())
	// }

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// if request.Name != "" {
	// 	user.Name = request.Name
	// }

	// if request.Email != "" {
	// 	user.Email = request.Email
	// }

	// if request.Password != "" {
	// 	user.Password = request.Password
	// }
	// if request.Phone != "" {
	// 	user.Phone = request.Phone
	// }
	// if request.Gender != "" {
	// 	user.Gender = request.Gender
	// }
	// if request.Address != "" {
	// 	user.Address = request.Address
	// }
	// if request.Image != "" {
	// 	user.Image = resp.SecureURL
	// }

	data, err := h.UserRepository.UpdateUser(user, id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data)}
	json.NewEncoder(w).Encode(response)
}

func (h *handler) DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	user, err := h.UserRepository.GetUser(id)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.UserRepository.DeleteUser(user, id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data)}
	json.NewEncoder(w).Encode(response)
}

func (h *handler) ChangeImage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// dataContex := r.Context().Value("dataFile") // add this code
	// filename := dataContex.(string)             // add this code

	dataContex := r.Context().Value("dataFile")
	filepath := dataContex.(string)

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	user, err := h.UserRepository.GetUser(id)
	
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	// userId := int(userInfo["id"].(float64))

	var ctx = context.Background()
	var CLOUD_NAME = "dcbv6artw"
	var API_KEY = "857953857788872"
	var API_SECRET = "W60IWegzDB3cBIvvz6f_4aSdk0g"

	// // Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// // Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "HalloCorona"})

	if err != nil {
		fmt.Println(err.Error())
	}

	if filepath != "false" {
		user.Image = resp.SecureURL
	}

	data, err := h.UserRepository.ChangeImage(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)

}
