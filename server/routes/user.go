package routes

import (
	"backend/handlers"
	"backend/pkg/middleware"
	"backend/pkg/mysql"
	"backend/repositories"

	"github.com/gorilla/mux"
)

func UserRoutes(r *mux.Router) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	// r.HandleFunc("/user", h.CreateUser).Methods("POST")
	r.HandleFunc("/users", h.FindUsers).Methods("GET")
	r.HandleFunc("/user/{id}", h.GetUser).Methods("GET")
	r.HandleFunc("/user/{id}", h.DeleteUser).Methods("DELETE")
	r.HandleFunc("/user/{id}", middleware.UploadFile(h.UpdateUser)).Methods("PATCH")
	r.HandleFunc("/change-image/{id}", middleware.Auth(middleware.UploadFile(h.ChangeImage))).Methods("PATCH")
}
