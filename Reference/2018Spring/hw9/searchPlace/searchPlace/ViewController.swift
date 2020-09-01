//
//  ViewController.swift
//  searchPlace
//
//  Created by Xiaoyi He on 9/4/18.
//  Copyright © 2018 Xiaoyi He. All rights reserved.
//

import UIKit
import McPicker
import GooglePlaces
import CoreLocation
import EasyToast
import Alamofire
import SwiftSpinner
import Kingfisher


struct GeoJson {
    var lat: Float
    var lng: Float
    
    init() {
        lat = 0
        lng = 0
    }
    mutating func setLatLng(lat: Float, lng:Float) {
        self.lat = lat
        self.lng = lng
    }
}



class ViewController: UIViewController, UITextFieldDelegate, CLLocationManagerDelegate, UITableViewDelegate, UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.favCount ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell: ResultCell = self.favoriteTableView.dequeueReusableCell(withIdentifier: "favoriteCell") as! ResultCell else {
            fatalError("The dequeued cell is not an instance of reviewcell")
        }
//        print("favcell")
        let favData = Array(favStored)[indexPath.row].value as! [String: String]
        cell.address.text = favData["address"]
        cell.placeName.text = favData["name"]
        let url = URL(string: favData["icon"]!)
        cell.icon.kf.setImage(with: url)
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        SwiftSpinner.show("Loading")
//        self.selectedIndex = indexPath.row!
        let favData = Array(favStored)[indexPath.row].value as! [String: String]
        self.selectedPlaceId = favData["placeId"]!
        let params:Parameters = [
            "placeId": favData["placeId"]!
        ]
        Alamofire.request("http://searchplace-env.us-east-2.elasticbeanstalk.com/api/details", parameters: params).responseJSON {
            response in
            switch response.result {
            case .success: do {
                print("success get details")
                self.details = response.result.value as! AnyObject
                self.myPerformSurge(identifier: "showDetailsFromFav")
                SwiftSpinner.hide()
                }
            case .failure(let error):
                print(error)
            }
        }
    }
    
    func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        return true
    }
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == UITableViewCellEditingStyle.delete {
            let favData = Array(favStored)[indexPath.row].value as! [String: String]
            self.selectedPlaceId = favData["placeId"]
            self.removeFavorite(data: favData)
//            self.favCount -= 1
            tableView.deleteRows(at: [indexPath], with: .fade)
            if self.favCount == 0 {
                self.favoriteTableView.backgroundView = noResult
            }
        }
    }
    
    var details: AnyObject?
    var placeClient: GMSPlacesClient!
    var locationManager: CLLocationManager!
    var myplace = GeoJson()
    var jsonData: Any?
    var userDefault = UserDefaults.standard
    var favCount: Int = 0
    var favStored: [String: Any] = [:]
    var selectedPlaceId: String?
    //MARK: Properties
    
    @IBOutlet weak var keywordField: UITextField!
    
    @IBOutlet var noResult: UIView!
    @IBOutlet weak var categoryField: McTextField!
    @IBOutlet weak var locationField: UITextField!
    @IBOutlet weak var distanceField: UITextField!
    @IBOutlet weak var searchButton: UIButton!
    @IBOutlet weak var clearButton: UIButton!
    
    @IBOutlet weak var favSegmentControl: UISegmentedControl!
    @IBOutlet weak var favoriteTableView: UITableView!
    var autocompleteController = GMSAutocompleteViewController()
    
    func loadFavorites() {
        favStored = (userDefault.object(forKey: "favorite") as? [String: Any])!
        self.favCount = (favStored.count)
        if self.favCount == 0 {
            self.favoriteTableView.backgroundView = noResult
        }
        else {
            self.favoriteTableView.backgroundView = nil
        }
        DispatchQueue.main.async(execute: self.favoriteTableView.reloadData)
//        print(favStored)
    }
    
    @objc func segmentControl(segment: UISegmentedControl) {
        if segment.selectedSegmentIndex == 1 {
            loadFavorites()
            favoriteTableView.alpha = 1
        }
        else {
            favoriteTableView.alpha = 0
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "Place Search"
        // Do any additional setup after loading the view, typically from a nib.
        keywordField.delegate = self
        locationField.delegate = self
        categoryField.delegate = self
        distanceField.delegate = self
        favoriteTableView.delegate = self
        favoriteTableView.dataSource = self
        favoriteTableView.rowHeight = 100
        autocompleteController.delegate = self
        locationManager = CLLocationManager()
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.requestAlwaysAuthorization()
        locationManager.startUpdatingLocation()
        placeClient = GMSPlacesClient.shared()
        self.view.toastBackgroundColor = UIColor.black.withAlphaComponent(0.7)
        self.view.toastTextColor = UIColor.white
        
        let categories: [[String]] = [[
            "Default",
            "Airport",
            "Amusement Park",
            "Aquarium",
            "Art Gallery",
            "Bakery",
            "Bar",
            "Beauty Salon",
            "Bowling Alley",
            "Bus Station",
            "Cafe",
            "Campground",
            "Car Rental",
            "Casino",
            "Lodging",
            "Movie Theater",
            "Museum",
            "Night Club",
            "Park",
            "Parking",
            "Restaurant",
            "Shopping Mall",
            "Stadium",
            "Subway Station",
            "Taxi Stand",
            "Train Station",
            "Transit Station",
            "Travel Agency",
            "Zoo"
            ]]
        let mcInputView = McPicker(data: categories)
        categoryField.inputViewMcPicker = mcInputView
        
        
        categoryField.doneHandler = {[weak categoryField] (selections) in categoryField?.text = selections[0]!}
        categoryField.selectionChangedHandler = {[weak categoryField] (selections, componentChanged) in categoryField?.text = selections[componentChanged]!}
        //categoryField.cancelHandler = {[weak categoryField] in categoryField?.text = ""}
        categoryField.textFieldWillBeginEditingHandler = {[weak categoryField] (selections) in
            if categoryField?.text == "" {
                categoryField?.text = selections[0]
            }
        }
        
        favSegmentControl.addTarget(self, action: #selector(segmentControl), for: .valueChanged)
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let location:CLLocationCoordinate2D = manager.location!.coordinate
        myplace.setLatLng(lat: Float(location.latitude), lng: Float(location.longitude))
        print("location= \(location.latitude), \(location.longitude)")
        print("myloc= \(myplace.lat), \(myplace.lng)")
    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    //MARK: delegate
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        print(textField.text)
        return true
    }
    
    @IBAction func locationAutoComplete() {
        present(autocompleteController, animated: true, completion: nil)
    }
    
    //MARK: Actions
    
    
    @IBAction func search(_ sender: UIButton) {
        print(keywordField.text)
        if (keywordField.text?.trimmingCharacters(in: .whitespaces).isEmpty)! {
            self.view.showToast("keyword can not be empty!", position: .bottom, popTime: 2, dismissOnTap: false)
            return
        }
        if (locationField.text?.trimmingCharacters(in: .whitespaces).isEmpty)! {
            self.view.showToast("location can not be empty!", position: .bottom, popTime: 2, dismissOnTap: false)
            return
        }
        var distance = "10"
        var isUserInput = "false"
        if distanceField.text != "" {
            distance = distanceField.text!
            if let check = Float(distance) {
            }
            else {
                self.view.showToast("distance should be number!", position: .bottom, popTime: 2, dismissOnTap: false)
                return
            }
        }
        if locationField.text != "Your location" {
            isUserInput = "true"
        }
        print(myplace)
        let keyword: String = keywordField.text!
        let category: String = categoryField.text!
        let location: String = locationField.text!
//        print(keywordField.text, categoryField.text, distanceField.text, locationField.text)
        let params: Parameters = [
            "keyword": keyword,
            "category": category,
            "distance": distance,
            "isUserInput": isUserInput,
            "location": location,
            "geoJson": ["lat": myplace.lat, "lng": myplace.lng]
        ]
        SwiftSpinner.show("Loading")
        Alamofire.request("http://searchplace-env.us-east-2.elasticbeanstalk.com/api/search", parameters: params).responseJSON {response in
            switch response.result {
            case .success: do {
                print("success")
                self.jsonData = response.result.value 
//                print(self.jsonData)
                
                self.myPerformSurge(identifier: "showResult")
                SwiftSpinner.hide()
            }
            case .failure(let error):
                print("error")
            }
        }
//        performSegue(withIdentifier: "showResult", sender: self)
    }
    
    private func myPerformSurge(identifier: String) {
        performSegue(withIdentifier: identifier, sender: self)
    }
    
    @objc func tweet() {
        print("tweet")
        let resultObj = self.details?["result"] as! [String: Any]
        let urlString = "https://twitter.com/intent/tweet?text=Check out \(resultObj["name"]! as! String) at \(resultObj["formatted_address"]! as? String ?? "" ). Website: &hashtags=TravelAndEntertainmentSearch&url=\(resultObj["website"] as? String ?? "" )"
        print(urlString)
        let url = urlString.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
        print(url)
        if let urlopen = URL(string: url!) {
            UIApplication.shared.open(urlopen, options: [:])
        }
        
    }
    
    var favTobeRemoved: Any?
    
    func removeFavorite(data: [String: String]) {
        let name = data["name"]!
        self.view.showToast("\(name) was removed from favorites!", position: .bottom, popTime: 2, dismissOnTap: false)
        self.favTobeRemoved = self.favStored[selectedPlaceId!]
        self.favStored.removeValue(forKey: self.selectedPlaceId!)
        userDefault.set(self.favStored, forKey: "favorite")
        self.favCount -= 1
        if self.favCount == 0 {
            self.favoriteTableView.backgroundView = noResult
        }
    }
    
    @objc func like() {
        print("like")
        let isFavorite = (self.favStored[self.selectedPlaceId!] != nil)
        let favData = self.favStored[self.selectedPlaceId!] as! [String: String]
        if isFavorite{
            self.removeFavorite(data: favData)
        }
        else {
            let name = favData["name"]
            self.view.showToast("\(name) was added into favorites!", position: .bottom, popTime: 2, dismissOnTap: false)
            
            self.favStored[selectedPlaceId!] = self.favTobeRemoved
            userDefault.set(self.favStored, forKey: "favorite")
            self.favCount += 1
//            self.setFavorite(cellResult: cellResult)
        }
        
        self.updateNavbar(isFavorite: !isFavorite)
        DispatchQueue.main.async(execute: self.favoriteTableView.reloadData)
    }
    
    func updateNavbar(isFavorite: Bool) {
        let tweet = UIBarButtonItem(image: #imageLiteral(resourceName: "forward"), style: .plain, target: self, action: #selector(self.tweet))
        var like: UIBarButtonItem?
        if isFavorite {
            like = UIBarButtonItem(image: #imageLiteral(resourceName: "heart-filled"), style: .plain, target: self, action: #selector(self.like))
        }
        else {
            like = UIBarButtonItem(image: #imageLiteral(resourceName: "heart-empty"), style: .plain, target: self, action: #selector(self.like))
        }
        self.tabnav?.rightBarButtonItems = [like!, tweet]
    }
    
    var tabnav: UINavigationItem?
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showResult" {
            let resultVC: ResultViewController = segue.destination as! ResultViewController
            resultVC.data = self.jsonData as AnyObject
        }
        if segue.identifier == "showDetailsFromFav" {
            let placeId = self.selectedPlaceId
            let resultObj = self.details?["result"] as AnyObject
            
            let tabViewController: UITabBarController = segue.destination as! UITabBarController
            self.tabnav = tabViewController.navigationItem
            self.tabnav?.backBarButtonItem = UIBarButtonItem(title: "", style: .plain, target: nil, action: nil)

            tabViewController.title = resultObj["name"] as? String
            let tweet = UIBarButtonItem(image: #imageLiteral(resourceName: "forward"), style: .plain, target: self, action: #selector(self.tweet))
            var like: UIBarButtonItem?
                like = UIBarButtonItem(image: #imageLiteral(resourceName: "heart-filled"), style: .plain, target: self, action: #selector(self.like))

            tabViewController.navigationItem.rightBarButtonItems = [like!, tweet]
            let infoViewController: InfoView = tabViewController.viewControllers?[0] as! InfoView
            let photoViewController: PhotosView = tabViewController.viewControllers?[1] as! PhotosView
            let mapViewController: MapView = tabViewController.viewControllers?[2] as! MapView
            let reviewViewController: ReviewView = tabViewController.viewControllers?[3] as! ReviewView
            let yelpInfo: [String: Any] = [
                "name": resultObj["name"] as! String,
                "addr": resultObj["address_components"] as! NSArray
            ]
            infoViewController.infoData = self.details?["result"] as! [String: Any]
            //            let photos = (self.details?["result"] as AnyObject)["photos"] as AnyObject
            photoViewController.placeId = placeId
            reviewViewController.reviewData = resultObj["reviews"] as AnyObject
            reviewViewController.yelpInfo = yelpInfo
            mapViewController.geodata = resultObj["geometry"] as AnyObject
        }
        
    }
    
    
    @IBAction func clear(_ sender: UIButton) {
        categoryField.text = "Default"
        keywordField.text = ""
        distanceField.text = ""
        locationField.text = "Your location"
        
    }
    
    
    
}
//MARK: Google place autocomplete
extension ViewController: GMSAutocompleteViewControllerDelegate {
    
    // Handle the user's selection.
    func viewController(_ viewController: GMSAutocompleteViewController, didAutocompleteWith place: GMSPlace) {
        self.locationField.text =  "\(String(describing: place.formattedAddress!))"
        dismiss(animated: true, completion: nil)
    }
    
    func viewController(_ viewController: GMSAutocompleteViewController, didFailAutocompleteWithError error: Error) {
        // TODO: handle the error.
        print("Error: ", error.localizedDescription)
    }
    
    // User canceled the operation.
    func wasCancelled(_ viewController: GMSAutocompleteViewController) {
        dismiss(animated: true, completion: nil)
    }
    
    // Turn the network activity indicator on and off again.
    func didRequestAutocompletePredictions(_ viewController: GMSAutocompleteViewController) {
        UIApplication.shared.isNetworkActivityIndicatorVisible = true
    }
    
    func didUpdateAutocompletePredictions(_ viewController: GMSAutocompleteViewController) {
        UIApplication.shared.isNetworkActivityIndicatorVisible = false
    }
    
}


