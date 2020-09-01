//
//  PhotosView.swift
//  searchPlace
//
//  Created by Xiaoyi He on 11/4/18.
//  Copyright © 2018 Xiaoyi He. All rights reserved.
//

import Foundation
import UIKit
import GooglePlaces
import Dispatch

class PhotosView: UIViewController, UICollectionViewDelegate, UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return photos.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell: UICollectionViewCell = photosCollection.dequeueReusableCell(withReuseIdentifier: "photo", for: indexPath)
        let bgImg = UIImageView()
        bgImg.image = self.photos[indexPath.row]
        bgImg.contentMode = .scaleAspectFill
        cell.backgroundView = bgImg
        return cell
    }
    
    func loadPhotoForPlace(placeID: String) {
        GMSPlacesClient.shared().lookUpPhotos(forPlaceID: placeID) { (photos, error) -> Void in
            if let error = error {
                print("Error: \(error.localizedDescription)")
                self.photosCollection.backgroundView = self.noPhotosView
            } else {
                if photos?.results.count == 0 {
                    self.photosCollection.backgroundView = self.noPhotosView
                }
                else {
                    self.photosCollection.backgroundView = nil
                }
                photos?.results.forEach {
                    (metadata) -> Void in
                        self.loadImageForMetadata(photoMetadata: metadata)
                }
            }
        }
    }
    
    func loadImageForMetadata(photoMetadata: GMSPlacePhotoMetadata) {
        GMSPlacesClient.shared().loadPlacePhoto(photoMetadata, callback: {
            (photo, error) -> Void in
            if let error = error {
                print("Error: \(error.localizedDescription)")
            } else {
                self.photos.append(photo!)
                DispatchQueue.main.async(execute: self.photosCollection.reloadData)
            }
        })
    }
    
    var placeId: String?
    private var photos = [UIImage]()
    @IBOutlet var photosCollection: UICollectionView!
    @IBOutlet weak var noPhotosView: UIView!
    override func viewDidLoad() {
        super.viewDidLoad()
        self.photosCollection.delegate = self
        self.photosCollection.dataSource = self
        self.loadPhotoForPlace(placeID: self.placeId!)
    }
}
