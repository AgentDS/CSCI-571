import random


def get_bus_info(station):
    info = []
    for random_bus in range(10):
        bus_name = f"W{random.randint(1, 100)}"
        bus_arrival_time = random.randint(1, 30)
        bus_info = f"{bus_name} and {bus_arrival_time} min to arrive"
        info.append(bus_info)
    return info


if __name__ == '__main__':
    for bus in get_bus_info('三元里'):
        print(bus)
