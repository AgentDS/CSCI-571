//
//  ResultCell.swift
//  searchPlace
//
//  Created by Xiaoyi He on 10/4/18.
//  Copyright © 2018 Xiaoyi He. All rights reserved.
//

import Foundation
import UIKit
import FontAwesome_swift

protocol ResultCellDelegate: class {
    func buttonTapped(cell: ResultCell)
}

class ResultCell: UITableViewCell {
    
    var delegate: ResultCellDelegate?
    //MARK: properties
    @IBOutlet weak var icon: UIImageView!
    @IBOutlet weak var placeName: UILabel!
    @IBOutlet weak var address: UILabel!
    
    @IBOutlet weak var favorite: UIButton!
    
    @IBAction func setfavorite(_ sender: Any) {
        print("like")
        self.delegate?.buttonTapped(cell: self)
    }
    override func prepareForReuse() {
        super.prepareForReuse()
        self.delegate = nil
    }
    
    override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
    }
    
}

@IBDesignable class TopAlignedLabel: UILabel {
    override func drawText(in rect: CGRect) {
        if let stringText = text {
            let stringTextAsNSString = stringText as NSString
            let labelStringSize = stringTextAsNSString.boundingRect(with: CGSize(width: self.frame.width,height: CGFloat.greatestFiniteMagnitude),
                                                                    options: NSStringDrawingOptions.usesLineFragmentOrigin,
                                                                    attributes: [NSAttributedStringKey.font: font],
                                                                    context: nil).size
            super.drawText(in: CGRect(x:0,y: 0,width: self.frame.width, height:ceil(labelStringSize.height)))
        } else {
            super.drawText(in: rect)
        }
    }
    override func prepareForInterfaceBuilder() {
        super.prepareForInterfaceBuilder()
        layer.borderWidth = 1
        layer.borderColor = UIColor.black.cgColor
    }
}

