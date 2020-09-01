//
//  MapVIew.swift
//  searchPlace
//
//  Created by Xiaoyi He on 11/4/18.
//  Copyright © 2018 Xiaoyi He. All rights reserved.
//

import Foundation
import UIKit
import GoogleMaps
import GooglePlaces
import Alamofire

class MapView: UIViewController {
    
    @IBOutlet weak var startInputView: UITextField!
    @IBOutlet weak var travelModeView: UISegmentedControl!
    @IBOutlet var ggMapView: GMSMapView!
    
    var geodata: AnyObject?
    var location: AnyObject?
    var startgeo: CLLocationCoordinate2D?
    var endgeo: CLLocationCoordinate2D?
    var autocompleteController = GMSAutocompleteViewController()
    var bound = GMSCoordinateBounds()
    
    enum mode: Int {
        case Driving = 0
        case Bicycling
        case Transit
        case Walking
        
        init?(index: Int) {
            switch index {
            case 0: self = .Driving
            case 1: self = .Bicycling
            case 2: self = .Transit
            case 3: self = .Walking
            default:
                return nil
            }
        }
        
        var text: String? {
            get {
                switch self {
                case .Driving:
                    return "driving"
                case .Bicycling:
                    return "bicycling"
                case .Transit:
                    return "transit"
                case .Walking:
                    return "walking"
                default:
                    return nil
                }
            }
        }
    }
    var modeSelected: mode = .Driving
    
    @objc func modeChanged(segment: UISegmentedControl) {
        let modeSelected = mode(rawValue: segment.selectedSegmentIndex)
        self.modeSelected = modeSelected!
        self.getRoutes(startgeo: startgeo!, endgeo: endgeo!)
    }
    
    func drawRoutes(point: String) {
        self.ggMapView.clear()
        let path = GMSPath.init(fromEncodedPath: point)
        let polyine = GMSPolyline.init(path: path)
        polyine.map = self.ggMapView
        
        let start = GMSMarker()
        start.position = startgeo!
        start.map = self.ggMapView
        
        let dest = GMSMarker()
        dest.position = endgeo!
        dest.map = self.ggMapView
        
        bound = bound.includingCoordinate(startgeo!).includingCoordinate(endgeo!)
        let update = GMSCameraUpdate.fit(bound, withPadding: 100)
        self.ggMapView.animate(with: update)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        autocompleteController.delegate = self as! GMSAutocompleteViewControllerDelegate
        let tmp = geodata!["location"]
        location = tmp! as AnyObject
        print(location)
        let lat = location!["lat"] as! Double
        let lng = location!["lng"] as! Double
        endgeo = CLLocationCoordinate2D(latitude: lat, longitude: lng)
        let camera = GMSCameraPosition.camera(withTarget: endgeo!, zoom: 15)
        self.ggMapView.camera = camera

        let marker = GMSMarker()
        marker.position = endgeo!
        marker.map = self.ggMapView
        travelModeView.addTarget(self, action: #selector(modeChanged), for: .valueChanged)
    }
    
    func getRoutes(startgeo: CLLocationCoordinate2D, endgeo: CLLocationCoordinate2D) {
        
        let params: Parameters = [
            "origin": ["lat": startgeo.latitude, "lng": startgeo.longitude],
            "destination": ["lat": endgeo.latitude, "lng": endgeo.longitude],
            "mode": self.modeSelected.text!
        ]
        Alamofire.request("http://searchplace-env.us-east-2.elasticbeanstalk.com/api/routes", parameters: params).responseJSON {
            response in
            switch response.result {
            case .success:
                print("success")
                print(response.result.value)
                let data = response.result.value as! [String: Any]
                self.drawRoutes(point: data["points"] as! String)
            case .failure(let error):
                print(error)
                
            }
        }
    }
    
    @IBAction func locationAutoComplete() {
        present(autocompleteController, animated: true, completion: nil)
    }
}


//MARK: Google place autocomplete
extension MapView: GMSAutocompleteViewControllerDelegate {
    
    // Handle the user's selection.
    func viewController(_ viewController: GMSAutocompleteViewController, didAutocompleteWith place: GMSPlace) {
        self.startInputView.text =  "\(String(describing: place.formattedAddress!))"
        self.startgeo = place.coordinate
//        print(startgeo)
        self.getRoutes(startgeo: startgeo!, endgeo: self.endgeo!)
        dismiss(animated: true, completion: nil)
    }
    
    func viewController(_ MapView: GMSAutocompleteViewController, didFailAutocompleteWithError error: Error) {
        // TODO: handle the error.
        print("Error: ", error.localizedDescription)
    }
    
    // User canceled the operation.
    func wasCancelled(_ MapView: GMSAutocompleteViewController) {
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
