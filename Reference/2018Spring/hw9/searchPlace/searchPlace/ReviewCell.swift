//
//  ReviewCell.swift
//  searchPlace
//
//  Created by Xiaoyi He on 15/4/18.
//  Copyright © 2018 Xiaoyi He. All rights reserved.
//

import Foundation
import UIKit
import Cosmos

class ReviewCell: UITableViewCell {
    //MARK: Properties
    @IBOutlet weak var authorName: UILabel!
    @IBOutlet weak var reviewRate: CosmosView!
    @IBOutlet weak var reviewTime: UILabel!
    @IBOutlet weak var reviewText: UILabel!
    @IBOutlet weak var authorImg: UIImageView!
    
    override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
}
